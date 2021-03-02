<?php


namespace AppBundle\Repositories;


use Carbon\Carbon;
use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\Tweet;
use Pimcore\Model\DataObject\Tweet\Listing;
use Zend\Paginator\Paginator;

class TweetsRepository
{
    public function getTweets($folderId) {
        $folder = Folder::getById($folderId);

        $tweetsListing = new Listing();
        $tweetsListing->setCondition('o_parentId = ? AND o_classId = ("tweet")', [$folder->getId()]);
        $tweetsListing->setLimit(20);

        return $tweetsListing->getObjects();
    }

}
