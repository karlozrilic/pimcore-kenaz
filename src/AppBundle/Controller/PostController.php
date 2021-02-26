<?php


namespace AppBundle\Controller;


use AppBundle\Form\CommentForm;
use AppBundle\Repositories\CategoryRepository;
use AppBundle\Repositories\CommentRepository;
use AppBundle\Repositories\PostRepository;
use AppBundle\Website\LinkGenerator\NewsLinkGenerator;
use AppBundle\Website\LinkGenerator\PostLinkGenerator;
use AppBundle\Website\LinkGenerator\TagLinkGenerator;
use Pimcore\Config\Config;
use Pimcore\Model\DataObject\Banner\Listing;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\Post;
use Pimcore\Model\DataObject\Tag;
use Pimcore\Templating\Helper\HeadTitle;
use Pimcore\Templating\Helper\Placeholder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class PostController extends BaseController
{
    const PER_PAGE_RESULTS = 10;

    private $postRepository;

    private $commentRepository;

    private $translator;

    private $postLinkGenerator;

    public function __construct(PostRepository $postRepository,
                                PostLinkGenerator $postLinkGenerator,
                                TranslatorInterface $translator,
                                CommentRepository $commentRepository)
    {
        $this->postRepository = $postRepository;
        $this->commentRepository = $commentRepository;
        $this->translator = $translator;
        $this->postLinkGenerator = $postLinkGenerator;
    }

    /**
     * @Route("{path}/{posttitle}~p{post}", name="post-detail", defaults={"path"=""}, requirements={"path"=".*?", "posttitle"="[\w-]+", "post"="\d+"})
     *
     * @param Request $request
     * @param HeadTitle $headTitle
     * @param Placeholder $placeholderHelper
     * @param TagLinkGenerator $tagLinkGenerator
     * @param Config $websiteConfig
     * @return mixed
     */
    public function show(Request $request, HeadTitle $headTitle, Placeholder $placeholderHelper, TagLinkGenerator $tagLinkGenerator, Config $websiteConfig) {
        $post = Post::getById($request->get('post'));

        if (!($post instanceof Post && ($post->isPublished() || $this->verifyPreviewRequest($request, $post)))) {
            throw new NotFoundHttpException('Post not found.');
        }

        $form = $this->createForm(CommentForm::class, [], []);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->commentRepository->saveComment($form, $post);
            $this->addFlash('success', $this->translator->trans('Comment successfully saved'));
            return $this->redirect($this->postLinkGenerator->generate($post));
        }

        $banners = new Listing();
        $banners->setOrderKey("RAND()", false);
        $banners->setLimit(2);

        $headTitle($post->getTitle());

        return [
            'post' => $post,
            'banners' => $banners,
            'commentForm' => $form->createView()
        ];
    }
}
