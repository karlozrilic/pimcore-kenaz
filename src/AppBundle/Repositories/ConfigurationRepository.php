<?php


namespace AppBundle\Repositories;


use Carbon\Carbon;
use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\Configuration;
use Pimcore\Model\DataObject\Configuration\Listing;
use Zend\Paginator\Paginator;

class ConfigurationRepository
{
    public function getConf($folderId) {
        $folder = Folder::getById($folderId);

        $newsListing = new Listing();
        $newsListing->setCondition('o_parentId = ? AND o_classId = ("conf")', [$folder->getId()]);
        $newsListing->setLimit(20);

        return $newsListing->getObjects();
    }
}
