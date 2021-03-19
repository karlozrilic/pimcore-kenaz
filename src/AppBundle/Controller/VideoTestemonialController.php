<?php

namespace AppBundle\Controller;

use AppBundle\Repositories\CategoryRepository;
use AppBundle\Repositories\VideoTestemonialRepository;
use Pimcore\Controller\FrontendController;
use Pimcore\Model\DataObject\VideoTestemonial;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Pimcore\Model\DataObject\Category;
use Symfony\Component\Routing\Annotation\Route;

class VideoTestemonialController extends FrontendController
{
    /** @var VideoTestemonialRepository $videoTestimonialRepository */
    private $videoTestimonialRepository;

    /** @var CategoryRepository $categoryRepository */
    private $categoryRepository;

    public function __construct(
        VideoTestemonialRepository $videoTestimonialRepository,
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
            $testemonials = $this->videoTestimonialRepository->getVideoTestemonialsByCategory($category);
            return [
                'editmode' => $this->view->editmode,
                'array' => $testemonials
            ];
        } else if (!$isSingleCategory && !$this->editmode) {
            $categoryList = $request->get('categoryList');
            $lst = array_map(function($categoryList) {
                return array(
                    $categoryList->getTitle()
                );
            }, $categoryList);
            $testemonials = $this->videoTestimonialRepository->getVideoTestemonialsWithCategoryArray($categoryList);
            return [
                'editmode' => $this->view->editmode,
                'array' => $testemonials
            ];
        }

        $allTestemonials = $this->videoTestimonialRepository->getAllVideoTestemonials();

        return [
            'editmode' => $this->view->editmode,
            'array' => $allTestemonials
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

        /** @var VideoTestemonial $videoTestimonial */
        foreach ($videoTestimonials as $videoTestimonial) {
            $videoTestimonialsData[] = [
                'author_name' => $videoTestimonial->getAuthor()->getFirstName(),
                'author_surname' => $videoTestimonial->getAuthor()->getLastName(),
                'author_image' => "/authors/" . explode("/authors/", $videoTestimonial->getAuthor()->getProfileImage()->getThumbnail('authorImageTestemonial')->getFileSystemPath())[1],
                'description' => $videoTestimonial->getDescription(),
                'video' => "/videos/" . explode("/videos/", $videoTestimonial->getVideo()->getData()->getFileSystemPath())[1]
            ];
        }

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
}
