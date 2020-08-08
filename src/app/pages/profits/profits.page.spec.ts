import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfitsPage } from './profits.page';

describe('ProfitsPage', () => {
  let component: ProfitsPage;
  let fixture: ComponentFixture<ProfitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
