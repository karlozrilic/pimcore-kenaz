<?php

namespace AppBundle\Controller;

use AppBundle\Repositories\CategoryRepository;
use AppBundle\Repositories\VideoTestimonialRepository;
use Pimcore\Controller\FrontendController;
use Pimcore\Model\DataObject\VideoTestimonial;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Pimcore\Model\DataObject\Category;
use Symfony\Component\Routing\Annotation\Route;

class VideoTestimonialController extends FrontendController
{
    /** @var VideoTestimonialRepository $videoTestimonialRepository */
    private $videoTestimonialRepository;

    /** @var CategoryRepository $categoryRepository */
    private $categoryRepository;

    public function __construct(
        VideoTestimonialRepository $videoTestimonialRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->videoTestimonialRepository = $videoTestimonialRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function showAction(Request $request)
    {
        
        $isSingleCategory = $request->get('singleCategory');

        if ($isSingleCategory && !$this->editmode) {
            $category = Category::getById($request->get("categoryId"));
            $testimonials = $this->videoTestimonialRepository->getVideoTestimonialsByCategory($category);
            return [
                'editmode' => $this->view->editmode,
                'array' => $testimonials
            ];
        } else if (!$isSingleCategory && !$this->editmode) {
            $categoryList = $request->get('categoryList');
            $lst = array_map(function($categoryList) {
                return array(
                    $categoryList->getTitle()
                );
            }, $categoryList);
            $testimonials = $this->videoTestimonialRepository->getVideoTestimonialsWithCategoryArray($categoryList);
            return [
                'editmode' => $this->view->editmode,
                'array' => $testimonials
            ];
        }

        $allTestimonials = $this->videoTestimonialRepository->getAllVideoTestimonials();
        
        return [
            'editmode' => $this->view->editmode,
            'array' => $allTestimonials
        ];

    }

    /**
     * @Route("/video-testimonials", name="video_testimonial_list")
     * @param Request $request
     * @Template()
     */
    public function listAction(Request $request)
    {
        $locale = $request->getLocale();
        $filterCategories = $request->get('categories', []);

        $videoTestimonials = $this->videoTestimonialRepository->filterList([
            'categories' => $filterCategories,
        ]);

        $categories = $this->categoryRepository->getCategoriesForVideoTestimonials($videoTestimonials->loadIdList());

        $categoriesData = [];

        /** @var Category $category */
        foreach ($categories as $category) {
            $categoriesData[$category->getId()] = $category->getTitle($locale);
        }

        $videoTestimonialsData = [];

        /** @var VideoTestimonial $videoTestimonial */
        foreach ($videoTestimonials as $videoTestimonial) {
            $videoTestimonialsData[] = [
                'author_name' => $videoTestimonial->getAuthor()->getFirstName(),
                'author_surname' => $videoTestimonial->getAuthor()->getLastName(),
                'author_image' => "/authors/" . explode("/authors/", $videoTestimonial->getAuthor()->getProfileImage()->getThumbnail('authorImageTestimonial')->getFileSystemPath())[1],
                'author_job_position' => $videoTestimonial->getAuthor()->getJobPosition(),
                'description' => $videoTestimonial->getDescription(),
                'video' => explode("/assets", $videoTestimonial->getVideo()->getData()->getFileSystemPath())[1],
                'video_settings' => $videoTestimonial->getVideo()->getData()->getCustomSettings(),
                'categories' => $this->getCat($videoTestimonial->getCategory())
            ];
        }

        ksort($categoriesData);

        if ($request->get('json')) {
            return $this->json([
                'video_testimonials' => $videoTestimonialsData,
                'categories_data' => $categoriesData,
                'filter_categories' => $filterCategories
            ]);
        }
        
        if ($this->container) {
            $this->view->videoTestimonials = $videoTestimonialsData;
            $this->view->categoriesData = $categoriesData;
            $this->view->filterCategories = $filterCategories;
        }

        return [
            'videoTestimonials' => $videoTestimonialsData,
            'categoriesData' => $categoriesData,
            'filterCategories' => $filterCategories
        ];
    }

    private function getCat($categoryList) {
        $temp = [];
        foreach ($categoryList as $category) {
            $temp[] = [
                'title' => $category->getTitle(),
                'link' => '/category/'.strtolower($category->getTitle()).'?categoryId='.$category->getId()
            ];
        }
        return $temp;
    }

}
