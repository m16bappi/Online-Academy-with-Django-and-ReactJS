from django.db import models
from django.contrib.auth.models import User


class Blogs(models.Model):
    author = models.ForeignKey(User, related_name='blog_author', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    cover = models.ImageField(default='BlogHeader.jpg', upload_to='blog_covers')
    blog = models.TextField()
    created_time = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='blog_likers', blank=True)

    class Meta:
        ordering = ['-created_time']

    def __str__(self):
        return self.title


class Comments(models.Model):
    Blog = models.ForeignKey(Blogs, on_delete=models.CASCADE, null=True)
    commentAuthor = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(blank=False)
    created_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_time']

    def __str__(self):
        return self.comment
