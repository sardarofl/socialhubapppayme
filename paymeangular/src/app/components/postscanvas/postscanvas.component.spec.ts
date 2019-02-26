import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostscanvasComponent } from './postscanvas.component';

describe('PostscanvasComponent', () => {
  let component: PostscanvasComponent;
  let fixture: ComponentFixture<PostscanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostscanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostscanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
