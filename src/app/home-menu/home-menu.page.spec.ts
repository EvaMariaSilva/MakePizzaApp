import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMenuPage } from './home-menu.page';

describe('HomeMenuPage', () => {
  let component: HomeMenuPage;
  let fixture: ComponentFixture<HomeMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
