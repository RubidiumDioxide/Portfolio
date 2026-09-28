import { Component, signal, inject } from '@angular/core'; 
import { Planet } from './components/planet/planet';
import { SatelliteIconService } from './services/satellite-icons.service';
import { Typer } from './components/typer/typer';
import { ProjectCard } from './components/project-card/project-card';
import { Project } from './interfaces/project.interface';


const projects:Project[] = [
  { title: "SOUPI", 
    subtitle: "веб-приложение", 
    description: "Система управления проектами для независимых команд с интеграцией Github и встроенным чат-ботом на Ollama. ", 
    stack: ["ASP.NET Core", "Entity Framework Core", "MS SQL Server", "OAuth2", "Octokit", "Ollama", "Blazor Server", "MudBlazor", "React", "webpack", "xUnit"], 
    repoLink: "https://github.com/RubidiumDioxide/SOUPI"  
  }, 
  { title: "PingV", 
    subtitle: "веб-приложение", 
    description: "Веб-приложение для управления своим расписанием и создания вишлистов для небольших групп пользователей. ", 
    stack: ["ASP.NET Core", "Entity Framework Core", "PostgreSQL", "Redis", "Docker", "Nginx", "Angular", "Material Angular"], 
    repoLink: "https://github.com/RubidiumDioxide/PingV"   
  }, 
  { title: "Orbita", 
    subtitle: "angular-компонент", 
    description: "Маленькие css-планеты. Крутятся. ", 
    stack: ["Angular", "Material Angular"], 
    repoLink: "https://github.com/RubidiumDioxide/Orbita", 
    demoLink: "https://rubidiumdioxide.github.io/Orbita/"  
  }, 
]

@Component({
  selector: 'app-root', 
  imports: [ 
    Planet,  
    Typer, 
    ProjectCard, 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {  
  protected readonly title = signal('Портфолио'); 

  public projects = signal<Project[]>(projects)
  
  readonly satelliteIconService = inject(SatelliteIconService); 
}
