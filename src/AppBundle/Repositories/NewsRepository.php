<?php

namespace AppBundle\Repositories;


use Carbon\Carbon;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\Post\Listing;

class NewsRepository
{

    /**
     * @param $folderId
     * @return array
     */
    public function getNews($folderId, $limit = 4)
    {
        $today = Carbon::now()->format('Y-m-d H:i:s');
        $folder = Folder::getById($folderId);
        $newsListing = new Listing();
        $newsListing->setCondition('o_parentId = ? AND publishDate < ? AND o_classId = ("post")', [$folder->getId(), $today]);
        $newsListing->setOrderKey("date");
        $newsListing->setOrder("desc");
        $newsListing->setLimit($limit);

        return $newsListing->getObjects();
    }

    public function getNewsFromCategory($id, $limit = 4) {
        $today =  Carbon::now()->format('Y-m-d H:i:s');
        $newsListing = new Listing();
        $newsListing->setCondition('category like ? AND publishDate < ? AND o_classId = ("post")', ['%' . $id . '%', $today]);
        $newsListing->setOrderKey("publishDate");
        $newsListing->setOrder("publishDate");
        $newsListing->setLimit($limit);

        return $newsListing->getObjects();
    }

    /**
     * @param int $limit
     * @return array
     */
    public function getRandomNews($limit = 5) {
        $news = new Listing();
        $news->setOrderKey("RAND()", false);
        $news->setLimit($limit);
        return $news->getObjects();
    }
}
