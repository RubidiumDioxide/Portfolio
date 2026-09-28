import { Injectable, signal, inject } from '@angular/core';
import { SatelliteIcon } from '../interfaces/satellite-icon.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


const customIcons:SatelliteIcon[] = [
    { title: 'Angular', name: 'angular', svgFileName: 'angular.svg', isFromText: false, displayText: '' }, 
    { title: 'Blazor', name: 'blazor', svgFileName: 'blazor.svg', isFromText: false, displayText: '' }, 
    { title: 'Bootstrap', name: 'bootstrap', svgFileName: 'bootstrap.svg', isFromText: false, displayText: '' }, 
    { title: 'C#', name: 'csharp', svgFileName: 'csharp.svg', isFromText: false, displayText: '' }, 
    { title: 'Docker', name: 'docker', svgFileName: 'docker.svg', isFromText: false, displayText: '' }, 
    { title: '.NET', name: 'dotnet', svgFileName: '', isFromText: true, displayText: '.NET' }, 
    { title: 'Entity Framework Core', name: 'efcore', svgFileName: '', isFromText: true, displayText: 'EF' }, 
    { title: 'Git', name: 'git', svgFileName: 'git.svg', isFromText: false, displayText: '' }, 
    { title: 'GitHub', name: 'github', svgFileName: 'github.svg', isFromText: false, displayText: '' }, 
    { title: 'Javascript', name: 'javascript', svgFileName: 'javascript.svg', isFromText: false, displayText: '' }, 
    { title: 'IIS', name: 'iis', svgFileName: '', isFromText: true, displayText: 'IIS' }, 
    { title: 'LINQ', name: 'linq', svgFileName: '', isFromText: true, displayText: 'LINQ' },  
    { title: 'Nginx', name: 'nginx', svgFileName: 'nginx.svg', isFromText: false, displayText: '' }, 
    { title: 'Node.js', name: 'nodejs', svgFileName: 'nodejs.svg', isFromText: false, displayText: '' }, 
    { title: 'Npm', name: 'npm', svgFileName: 'npm.svg', isFromText: false, displayText: '' }, 
    { title: 'OAuth', name: 'oauth', svgFileName: '', isFromText: true, displayText: 'OAuth' }, 
    { title: 'Ollama', name: 'ollama', svgFileName: 'ollama.svg', isFromText: false, displayText: '' }, 
    { title: 'PostgreSQL', name: 'postgresql', svgFileName: 'postgresql.svg', isFromText: false, displayText: '' }, 
    { title: 'React', name: 'react', svgFileName: 'react.svg', isFromText: false, displayText: '' }, 
    { title: 'Redis', name: 'redis', svgFileName: 'redis.svg', isFromText: false, displayText: '' }, 
    { title: 'SQLite', name: 'sqlite', svgFileName: 'sqlite.svg', isFromText: false, displayText: '' }, 
    { title: 'SQL Server', name: 'sqlserver', svgFileName: 'sqlserver.svg', isFromText: false, displayText: '' },     
    { title: 'Swagger', name: 'swagger', svgFileName: 'swagger.svg', isFromText: false, displayText: '' }, 
    { title: 'Typescript', name: 'typescript', svgFileName: 'typescript.svg', isFromText: false, displayText: '' },  
    { title: 'Visual Studio', name: 'visualstudio', svgFileName: 'visualstudio.svg', isFromText: false, displayText: '' }, 
    { title: 'Visual Studio Code', name: 'vscode', svgFileName: 'vscode.svg', isFromText: false, displayText: '' }, 
]; 

@Injectable({
    providedIn: 'root', 
})
export class SatelliteIconService { 
    private iconRegistry = inject(MatIconRegistry); 
    private sanitizer = inject(DomSanitizer); 
    
    icons = signal<SatelliteIcon[]>(customIcons);
    
    constructor() {
        this.registerIcons(); 
    }

    private registerIcons() {
        this.icons().forEach(icon => {
            if (icon.isFromText) {
                return;
            }

            this.iconRegistry.addSvgIcon(
                icon.name,
                this.sanitizer.bypassSecurityTrustResourceUrl(`./icons/${icon.svgFileName}`)
            );
        });
    }
}