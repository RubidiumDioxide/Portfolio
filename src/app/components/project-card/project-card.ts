import { Component, input, signal, inject, OnInit, AfterViewInit, DestroyRef, ElementRef, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Project } from '../../interfaces/project.interface';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-project-card',
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatChipsModule,  
    MatDividerModule, 
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard implements OnInit, AfterViewInit{  
  private destroyRef = inject(DestroyRef); 
  private elementRef = inject(ElementRef); 
  private isDestroyed = false; 
  private observer?: IntersectionObserver; 
  public isVisible = signal<boolean>(false);  
  public project = input<Project>({
    title: "title", 
    subtitle: "subtitle", 
    description: "description", 
    stack: ["a", "b", "c"], 
    repoLink: "/"
  });  

  public index = input<number>(0);

  @HostBinding('style.--anim-delay') 
  get staggerDelay(): string {
    return `${this.index() * 200}ms`; 
  }

  @HostBinding('class.is-visible') 
  get visibleClass(): boolean {
    return this.isVisible();
  }

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.isDestroyed = true; 
      this.observer?.disconnect();
    });
  }

  ngAfterViewInit(): void {
    const targetElement = this.elementRef.nativeElement; 

    if (targetElement) {
      this.initScrollObserver(targetElement);
      return;
    }
    
    // fallback 
    this.triggerAnimation(); 
  }

  private initScrollObserver(target: Element): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.isDestroyed) {
          this.triggerAnimation(); 
          this.observer?.disconnect(); // ensure animation triggers only once 
        }
      },
      { threshold: 0.4 } 
    );

    this.observer.observe(target); 
  }

  triggerAnimation() { 
    console.log("animation triggered");
    this.isVisible.set(true); 
  }
}
