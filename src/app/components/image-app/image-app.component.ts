import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-image-app",
  templateUrl: "./image-app.component.html",
  styleUrls: ["./image-app.component.css"],
})
export class ImageAppComponent {
  constructor(private httpClient: HttpClient) {}
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  // Gets called when the user selects an image
  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }
  // Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append(
      "imageFile",
      this.selectedFile,
      this.selectedFile.name
    );

    // Make a call to the Spring Boot Application to save the image
    this.httpClient
      .post(environment.baseUrl + "image/upload", uploadImageData, {
        observe: "response",
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = "Image uploaded successfully";
        } else {
          this.message = "Image not uploaded successfully";
        }
      });
  }
  // Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    // Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient
      .get(environment.baseUrl + "image/get/" + this.imageName)
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = "data:image/jpeg;base64," + this.base64Data;
      });
  }
}
