import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../../services/getdata.service';

@Component({
  selector: 'app-postscanvas',
  templateUrl: './postscanvas.component.html',
  styleUrls: ['./postscanvas.component.css']
})

export class PostscanvasComponent implements OnInit {

  constructor(private getDataService:GetdataService) {

    
   }

  //loading posts
  loadingposts=true;

  //variables
  posts;
  postslength=2;


  ngOnInit() {
    console.log(this.postslength)
    window.onscroll = () =>
    {
       var scrollHeight, totalHeight;
       scrollHeight = document.body.scrollHeight;
       totalHeight = window.scrollY + window.innerHeight;
   
       if(totalHeight >= scrollHeight)
       {
        this.postslength=this.postslength+2;
        this.getDataService.getData(`/fetchs/fetch_posts?limit=`+this.postslength).subscribe((posts) => {
          this.loadingposts=true;
          console.log(posts)
          if(this.posts.length < posts.length)
          this.posts = posts;
          this.loadingposts=false;
        },
        err=>{
          return false;
        });
       }
   }
    this.getDataService.getData(`/fetchs/fetch_posts?limit=`+this.postslength).subscribe((posts) => {
      this.loadingposts=true;
      console.log(posts)
      this.posts = posts;
      this.loadingposts=false;
  },
  err=>{
    return false;
  });
  }

}
