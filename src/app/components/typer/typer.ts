import { Component, input, signal, OnInit, AfterViewInit, inject, DestroyRef, ElementRef } from '@angular/core';
import { ScriptLine } from '../../interfaces/script-line.interface';
import { DisplayLine } from '../../interfaces/display-line.interface';


@Component({
  selector: 'app-typer',
  standalone: true,
  templateUrl: './typer.html',
  styleUrl: './typer.scss',
})
export class Typer implements OnInit, AfterViewInit {
  private destroyRef = inject(DestroyRef); 
  private elementRef = inject(ElementRef); 
  private isDestroyed = false; 
  private observer?: IntersectionObserver; 
  
  // read-only input
  public lines = input<ScriptLine[]>([
    { text: "Hi ", fontSize: 80, typingSpeed: 1 },
    { text: "Make yourself at home ", fontSize: 40, typingSpeed: 3 }
  ]);

  // local writable signal for reactive UI updates
  public displayLines = signal<DisplayLine[]>([]);

  ngOnInit(): void {
    // flag when component unmounts to break async loops safely
    this.destroyRef.onDestroy(() => {
      this.isDestroyed = true; 
      this.observer?.disconnect(); 
    });

    // initialize local state from input 
    this.displayLines.set(
      this.lines().map(line => ({
        ...line,
        displayedText: '',
        isCursorVisible: false, 
        isVisible: false, 
      }))
    );
  }

  ngAfterViewInit(): void {
    const targetElement = this.elementRef.nativeElement; 

    if (targetElement) {
      this.initScrollObserver(targetElement);
      return;
    }
    
    // fallback 
    this.typeAllLines();
  }

  private initScrollObserver(target: Element): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.isDestroyed) {
          this.typeAllLines();
          this.observer?.disconnect(); // ensure typing triggers only once 
        }
      },
      { threshold: 0.4 } 
    );

    this.observer.observe(target);
  }

  public async typeAllLines(): Promise<void> {
    const linesCount = this.displayLines().length;

    for (let i = 0; i < linesCount; i++) {
      if (this.isDestroyed) return;

      const targetLine = this.displayLines()[i]; 
      const targetText = this.lines()[i]?.text || ''; 
      const isInstant = targetLine.typingSpeed === 0;

      // set active cursor position (cursor is active on the current line only)
      this.displayLines.update(current =>
        current.map((line, index) => ({
          ...line,
          isCursorVisible: index === i && !isInstant, 
          isVisible: index === i ? true : line.isVisible 
        }))
      );

      if (isInstant) {
        this.displayLines.update(current => {
          const updated = [...current];
          updated[i] = {
            ...updated[i], 
            displayedText: targetText, 
            isVisible: true, 
          }; 
            
          return updated;
        }); 

        await new Promise(resolve => setTimeout(resolve, 500)); 
      } else {
         for (let j = 0; j < targetText.length; j++) {
          if (this.isDestroyed) return;

          this.displayLines.update(current => {
            const updated = [...current];
            updated[i] = {
              ...updated[i], 
              displayedText: updated[i].displayedText + targetText[j]
            }; 
            
            return updated;
          });
          
          const speed = this.displayLines()[i].typingSpeed || 1; 
          const randomDelay = (Math.floor(Math.random() * (80)) + 40)/speed;
          await new Promise(resolve => setTimeout(resolve, randomDelay));
        }
      }

      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }
} 