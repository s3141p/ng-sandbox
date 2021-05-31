import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'devkit-mock-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() data: string = '';
  @Output() out = new EventEmitter<string>();

  id!: number;

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.id);
  }
}
