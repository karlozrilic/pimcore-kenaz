<?php


namespace AppBundle\Repositories;


use Carbon\Carbon;
use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\Tag;
use Pimcore\Model\DataObject\Tag\Listing;
use Zend\Paginator\Paginator;

class TagRepository
{
    public function getTags($folderId) {
        $folder = Folder::getById($folderId);

        $newsListing = new Listing();
        $newsListing->setCondition('o_parentId = ? AND o_classId = ("tag")', [$folder->getId()]);
        $newsListing->setLimit(20);

        return $newsListing->getObjects();
    }

    /**
     * @param Tag $tag
     * @param $page
     * @param $limit
     *
     * @return Paginator
     */
    public function getTagPosts($tag, $page, $limit) {
        $newsListing = new \Pimcore\Model\DataObject\Post\Listing();
        $newsListing->setOrderKey("publishDate");
        $newsListing->setOrder("desc");
        $newsListing->setCondition('tags like ?', ['%' . $tag->getId() . '%']);

        $paginator = new Paginator($newsListing);
        $paginator->setCurrentPageNumber($page);
        $paginator->setItemCountPerPage($limit);

        return $paginator;
    }
}
