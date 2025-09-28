import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import useStore from '@/store/store';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { companies } = useStore();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    company: '',
    questions: [''],
    tags: [] as string[],
    currentTag: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (value: string) => {
    setFormData(prev => ({ ...prev, company: value }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = value;
    setFormData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, '']
    }));
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, currentTag: e.target.value }));
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && formData.currentTag.trim()) {
      e.preventDefault();
      if (formData.tags.length >= 5) {
        toast({
          title: "Maximum tags reached",
          description: "You can only add up to 5 tags.",
          variant: "destructive",
        });
        return;
      }

      if (!formData.tags.includes(formData.currentTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, prev.currentTag.trim()],
          currentTag: '',
        }));
      } else {
        toast({
          title: "Duplicate tag",
          description: "This tag has already been added.",
          variant: "destructive",
        });
      }
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Title is required",
        description: "Please enter a title for your post.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.title.trim().length < 10) {
      toast({
        title: "Title is too short",
        description: "Please enter a more descriptive title (at least 10 characters).",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Content is required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.content.trim().length < 50) {
      toast({
        title: "Content is too short",
        description: "Please provide more details in your post (at least 50 characters).",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.company) {
      toast({
        title: "Company is required",
        description: "Please select a company for your post.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.questions.filter(q => q.trim()).length === 0) {
      toast({
        title: "Questions are required",
        description: "Please add at least one interview question.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.tags.length === 0) {
      toast({
        title: "Tags are required",
        description: "Please add at least one tag to categorize your post.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would submit the form data to an API
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Post created successfully",
        description: "Your interview experience has been shared.",
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Error creating post",
        description: "There was an error creating your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="page-container animate-fade-in">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Share Your Interview Experience</h1>
          <p className="text-muted-foreground mt-1">
            Help others prepare by sharing your interview questions and insights
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
            <CardDescription>
              Fill out the form below to share your interview experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., My Software Engineer Interview at Google"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select
                  value={formData.company}
                  onValueChange={handleCompanyChange}
                  required
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map(company => (
                      <SelectItem key={company.id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Interview Experience</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Describe your interview experience (application process, interview rounds, tips, etc.)"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="min-h-32"
                />
              </div>

              {/* Questions */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Interview Questions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addQuestion}
                    disabled={formData.questions.length >= 10}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Question
                  </Button>
                </div>

                {formData.questions.map((question, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Question ${index + 1}`}
                      value={question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      required
                      className="flex-1"
                    />
                    {formData.questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <p className="text-xs text-muted-foreground">
                  Add up to 10 interview questions that were asked during your interview
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <Input
                  id="tags"
                  placeholder="Add tags (e.g., Software Engineering, System Design) and press Enter"
                  value={formData.currentTag}
                  onChange={handleTagChange}
                  onKeyDown={addTag}
                  disabled={formData.tags.length >= 5}
                />

                <p className="text-xs text-muted-foreground">
                  Add up to 5 tags to help others find your post
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Create Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreatePostPage;