import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliverydetailPage } from './deliverydetail.page';

describe('DeliverydetailPage', () => {
  let component: DeliverydetailPage;
  let fixture: ComponentFixture<DeliverydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverydetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
