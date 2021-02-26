<?php


namespace AppBundle\Controller;


use AppBundle\Repositories\TagRepository;
use AppBundle\Website\LinkGenerator\NewsLinkGenerator;
use AppBundle\Website\LinkGenerator\TagLinkGenerator;
use Pimcore\Config\Config;
use Pimcore\Model\DataObject\Tag;
use Pimcore\Templating\Helper\HeadTitle;
use Pimcore\Templating\Helper\Placeholder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class TagController extends BaseController
{
    const PER_PAGE_RESULTS = 10;

    private $tagRepository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * @Route("{path}/{tagtitle}~t{tag}", name="tag-detail", defaults={"path"=""}, requirements={"path"=".*?", "tagtitle"="[\w-]+", "tag"="\d+"})
     *
     * @param Request $request
     * @param HeadTitle $headTitle
     * @param Placeholder $placeholderHelper
     * @param TagLinkGenerator $tagLinkGenerator
     * @param Config $websiteConfig
     * @return array
     */
    public function show(Request $request, HeadTitle $headTitle, Placeholder $placeholderHelper, TagLinkGenerator $tagLinkGenerator, Config $websiteConfig) {
        $tag = Tag::getById($request->get('tag'));

        if (!($tag instanceof Tag && ($tag->isPublished() || $this->verifyPreviewRequest($request, $tag)))) {
            throw new NotFoundHttpException('Tag not found.');
        }

        $headTitle($tag->getTitle());

        $posts = $this->tagRepository->getTagPosts($tag,
            $request->get('page', 1),
            $request->get('limit', $websiteConfig->get('newsPerPageResults', self::PER_PAGE_RESULTS))
        );

        return [
            'tag' => $tag,
            'posts' => $posts
        ];
    }
}
