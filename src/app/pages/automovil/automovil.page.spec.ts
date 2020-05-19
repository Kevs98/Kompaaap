import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutomovilPage } from './automovil.page';

describe('AutomovilPage', () => {
  let component: AutomovilPage;
  let fixture: ComponentFixture<AutomovilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomovilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutomovilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
