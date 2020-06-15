import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VipservicesPage } from './vipservices.page';

describe('VipservicesPage', () => {
  let component: VipservicesPage;
  let fixture: ComponentFixture<VipservicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipservicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VipservicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
