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
<<<<<<< HEAD
            $category = Category::getById($request->get("categoryId"));
            $testemonials = $this->videoTestemonialRepository->getVideoTestemonialsByCategory($category);
=======
            $categoryName = ucfirst($request->get('category'));
            $category = Category::getByPath("/Blog/Categories/{$categoryName}");
            $testemonials = $this->videoTestimonialRepository->getVideoTestemonialsByCategory($category);
>>>>>>> bf4e686b0955dda3a8f0fc57f06642040116e3f3
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
                'author' => $videoTestimonial->getAuthor()->getFirstName(),
            ];
        }

        if ($request->get('json')) {
            return $this->json([
                'video_testimonials' => $videoTestimonialsData,
                'categories_data' => $categoriesData,
            ]);
        }

        $this->view->videoTestimonials = $videoTestimonialsData;
        $this->view->categoriesData = $categoriesData;
    }
}
