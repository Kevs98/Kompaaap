import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActiveServicePage } from './active-service.page';

describe('ActiveServicePage', () => {
  let component: ActiveServicePage;
  let fixture: ComponentFixture<ActiveServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
