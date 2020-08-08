import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobhistoryPage } from './jobhistory.page';

describe('JobhistoryPage', () => {
  let component: JobhistoryPage;
  let fixture: ComponentFixture<JobhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
