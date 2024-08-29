import { Component } from '@angular/core';
import { SkillsDropdownComponent } from "../skills-dropdown/skills-dropdown.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SkillsDropdownComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

}
