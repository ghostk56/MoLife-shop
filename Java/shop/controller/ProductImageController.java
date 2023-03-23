package com.tibame.tga105.shop.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tibame.tga105.shop.service.ProductImageService;

@RestController
@RequestMapping("/productimages")
public class ProductImageController {

	@Autowired
	private ProductImageService productImageService;

	@GetMapping("/{imageName}")
	public ResponseEntity<byte[]> select(@PathVariable String imageName) throws IOException {
		if (imageName == null)
			return ResponseEntity.notFound().build();

		byte[] imageData = productImageService.getImage(imageName);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);

		return new ResponseEntity<byte[]>(imageData, headers, HttpStatus.OK);
	}

	@PostMapping
	public String insert(MultipartFile image) throws IOException {
		if (image != null)
			return productImageService.saveImage(image);

		return null;
	}

}
