import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KloginPage } from './klogin.page';

describe('KloginPage', () => {
  let component: KloginPage;
  let fixture: ComponentFixture<KloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
