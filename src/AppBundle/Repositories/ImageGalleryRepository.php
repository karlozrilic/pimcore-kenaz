<?php


namespace AppBundle\Repositories;


use Pimcore\Model\DataObject\ImageGallery;

class ImageGalleryRepository
{
    public function getImageGallery($id) {
        return ImageGallery::getById($id);
    }
}
