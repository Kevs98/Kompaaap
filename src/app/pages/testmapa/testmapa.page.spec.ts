import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestmapaPage } from './testmapa.page';

describe('TestmapaPage', () => {
  let component: TestmapaPage;
  let fixture: ComponentFixture<TestmapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestmapaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestmapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
