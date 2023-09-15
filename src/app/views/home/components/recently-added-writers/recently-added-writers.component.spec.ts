import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentlyAddedWritersComponent } from './recently-added-writers.component';

describe('RecentlyAddedWritersComponent', () => {
  let component: RecentlyAddedWritersComponent;
  let fixture: ComponentFixture<RecentlyAddedWritersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyAddedWritersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentlyAddedWritersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
