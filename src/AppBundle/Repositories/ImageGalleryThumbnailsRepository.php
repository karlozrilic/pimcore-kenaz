<?php


namespace AppBundle\Repositories;


use Pimcore\Model\DataObject\ImageGalleryWithThumbnails;

class ImageGalleryThumbnailsRepository
{
    public function getImageGallery($id) {
        return ImageGalleryWithThumbnails::getById($id);
    }
}
