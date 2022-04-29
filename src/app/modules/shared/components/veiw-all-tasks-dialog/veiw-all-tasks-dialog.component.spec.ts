import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwAllTasksDialogComponent } from './veiw-all-tasks-dialog.component';

describe('VeiwAllTasksDialogComponent', () => {
  let component: VeiwAllTasksDialogComponent;
  let fixture: ComponentFixture<VeiwAllTasksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwAllTasksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwAllTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
