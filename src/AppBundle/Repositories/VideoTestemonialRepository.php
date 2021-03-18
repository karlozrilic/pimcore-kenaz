<?php


namespace AppBundle\Repositories;


use Carbon\Carbon;
use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\VideoTestemonial;
use Pimcore\Model\DataObject\VideoTestemonial\Listing;

class VideoTestemonialRepository
{
    public function getAllVideoTestemonials() {
        $videoTestemonialListing = new Listing();

        return $videoTestemonialListing->getObjects();
    }

    /**
     * @param Category $category
     * @param $limit
     *
     * @return Listing
     */
    public function getVideoTestemonialsByCategory($category, $limit = 3) {
        if ($limit > 3) {
            $limit = 3;
        }
        $videoTestemonialListing = new Listing();
        $videoTestemonialListing->setOrder("desc");
        $videoTestemonialListing->setLimit($limit);
        $videoTestemonialListing->setCondition('category like ?', ['%,' . $category->getId() . ',%']);

        return $videoTestemonialListing;
    }

    public function getVideoTestemonialsWithCategoryArray($categoryArray, $limit = 3) {
        if (count($categoryArray) == 0) {
            return;
        }
        if ($limit > 3) {
            $limit = 3;
        }

        $statement = 'category like ?';
        $statementArray = ['%' . array_values($categoryArray)[0]->getId() . '%'];

        if (count($categoryArray) > 1) {
            $statementArray = [];
            foreach ($categoryArray as $key => $value) {
                $statementArray[] = ['%' . $value->getId() . '%'];
                if ($key != count($categoryArray)-1) {
                    $statement .= ' OR category like ?';
                }
            }
            unset($value);
        }

        $videoTestemonialListing = new Listing();
        $videoTestemonialListing->setLimit($limit);
        $videoTestemonialListing->setCondition($statement, $statementArray);

        return $videoTestemonialListing;
    }

}
