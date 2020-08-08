import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobscurrentPage } from './jobscurrent.page';

describe('JobscurrentPage', () => {
  let component: JobscurrentPage;
  let fixture: ComponentFixture<JobscurrentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobscurrentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobscurrentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
