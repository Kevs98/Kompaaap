import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardfnPage } from './cardfn.page';

describe('CardfnPage', () => {
  let component: CardfnPage;
  let fixture: ComponentFixture<CardfnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardfnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardfnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
