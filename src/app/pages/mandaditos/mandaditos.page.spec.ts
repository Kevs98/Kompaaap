import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MandaditosPage } from './mandaditos.page';

describe('MandaditosPage', () => {
  let component: MandaditosPage;
  let fixture: ComponentFixture<MandaditosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandaditosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MandaditosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
