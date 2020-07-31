<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiPostController extends AbstractController
{
    /**
     * @Route("/api/post", name="api_post_index", methods={"GET"})
     */
    public function index(PostRepository $pr)
    {
        $posts = $pr->findLastest(10);
       
        return $this->json($posts, 200, [], [
            'groups' => 'post:read'
        ]);
    }

    /**
     * @Route("/api/post", name="api_post_create", methods={"POST"})
     */
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $jsonIncome = $request->getContent();
        
        
        try{
            $post = $serializer->deserialize($jsonIncome, Post::class, 'json');
            
            $post->setCreatedAt(new \DateTime());

            $errors = $validator->validate($post);

            if(count($errors) > 0){
                return $this->json($errors, 400);
            }

            $em->persist($post);
            $em->flush();
            
            return $this->json($post, 201, [], [
                'groups' => 'post:read'
            ]);
        }
        catch(NotEncodableValueException $e){
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400, []);
        }
        
    }
    
    /**
     * @Route("/api/delete/{id}", name="api_delete", methods={"GET"})
     */
    public function delete(Post $post, EntityManagerInterface $em){
        $em->remove($post);
        $em->flush();
        
        return $this->json(true, 200);
    }
}
