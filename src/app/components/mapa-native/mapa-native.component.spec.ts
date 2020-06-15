import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapaNativeComponent } from './mapa-native.component';

describe('MapaNativeComponent', () => {
  let component: MapaNativeComponent;
  let fixture: ComponentFixture<MapaNativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaNativeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
