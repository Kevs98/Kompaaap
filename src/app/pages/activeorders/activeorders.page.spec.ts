import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActiveordersPage } from './activeorders.page';

describe('ActiveordersPage', () => {
  let component: ActiveordersPage;
  let fixture: ComponentFixture<ActiveordersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveordersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveordersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
