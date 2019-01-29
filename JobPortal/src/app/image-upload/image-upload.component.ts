
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

class ImageSnippet {
  constructor(public source: string, public file: File ) { }
}


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  uploadFile: FormGroup
  selectedFile: ImageSnippet
  constructor(private imageService: HttpService, private fb: FormBuilder, private toastr: ToastrService ) { }

  ngOnInit() {
    this.uploadFile = this.fb.group({
      photo: ['', [Validators.required]]
    })
  }

  processFile(imageInput: any) {
    
    const file: File = imageInput.files[0];
    console.log("inside image uploader",file.type);
    if ((file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") && (file.size <= 2097152)) {
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.imageService.uploadImage(this.selectedFile.file).subscribe(res => { console.log(res) })
      });
      reader.readAsDataURL(file);

      this.toastr.success('image uploaded succesfully',"done...!",{
        timeOut: 2500
      });
    }
    else {
      this.toastr.error('image should be less than 2 mb and only of type .png or .jpg',"can't upload file",{
        timeOut: 2500
      });

    }

  }

}
