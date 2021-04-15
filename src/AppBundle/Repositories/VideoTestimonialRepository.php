<?php


namespace AppBundle\Repositories;


use Carbon\Carbon;
use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\VideoTestimonial;
use Pimcore\Model\DataObject\VideoTestimonial\Listing;

class VideoTestimonialRepository
{
    public function getAllVideoTestimonials() {
        $videoTestimonialListing = new Listing();

        return $videoTestimonialListing->getObjects();
    }

    /**
     * @param Category $category
     * @param $limit
     *
     * @return Listing
     */
    public function getVideoTestimonialsByCategory($category, $limit = 3) {
        if ($limit > 3) {
            $limit = 3;
        }
        $videoTestimonialListing = new Listing();
        $videoTestimonialListing->setOrder("desc");
        $videoTestimonialListing->setLimit($limit);
        $videoTestimonialListing->setCondition('category like ?', ['%,' . $category->getId() . ',%']);

        return $videoTestimonialListing;
    }

    public function getVideoTestimonialsWithCategoryArray($categoryArray, $limit = 3) {
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

        $videoTestimonialListing = new Listing();
        $videoTestimonialListing->setLimit($limit);
        $videoTestimonialListing->setCondition($statement, $statementArray);

        return $videoTestimonialListing;
    }

    public function filterList(array $filters = [])
    {
        $list = VideoTestimonial::getList();

        if (array_key_exists('categories', $filters) && is_array($filters['categories'])) {
            foreach ($filters['categories'] as $category) {
                $list->addConditionParam('category LIKE ?', ["%,$category,%"]);
            }
        }

        return $list;
    }
}
