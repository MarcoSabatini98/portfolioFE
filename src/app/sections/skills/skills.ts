import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly groups = [
    { key: 'skills.frontend', items: ['Angular 21', 'TypeScript', 'RxJS', 'HTML5', 'CSS3/SCSS', 'Angular Material', 'Bootstrap'] },
    { key: 'skills.backend', items: ['Node.js', 'Express', 'Sequelize', 'MySQL/MariaDB', 'REST', 'JWT', 'Socket.IO'] },
    { key: 'skills.tooling', items: ['Git', 'Husky', 'ESLint', 'Prettier', 'CI/CD', 'Vitest', 'Jest'] },
  ];
}
