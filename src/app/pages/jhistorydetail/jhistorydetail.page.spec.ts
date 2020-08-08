import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JhistorydetailPage } from './jhistorydetail.page';

describe('JhistorydetailPage', () => {
  let component: JhistorydetailPage;
  let fixture: ComponentFixture<JhistorydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JhistorydetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JhistorydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
