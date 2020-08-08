import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuRestaurantsPage } from './menu-restaurants.page';

describe('MenuRestaurantsPage', () => {
  let component: MenuRestaurantsPage;
  let fixture: ComponentFixture<MenuRestaurantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRestaurantsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuRestaurantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
