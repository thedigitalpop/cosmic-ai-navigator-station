import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Download, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Globe,
  Search,
  Share2,
  FileText
} from 'lucide-react';
import { downloadSitemap, submitSitemapToSearchEngines } from '../../utils/sitemapGenerator';
import { toast } from '../../hooks/use-toast';

const SEOManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const currentDomain = window.location.origin;
  const sitemapUrl = `${currentDomain}/sitemap.xml`;

  const handleDownloadSitemap = async () => {
    try {
      setLoading(true);
      await downloadSitemap();
      toast({
        title: "Sitemap Downloaded",
        description: "The sitemap.xml file has been downloaded to your computer.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate sitemap. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSitemap = () => {
    submitSitemapToSearchEngines(sitemapUrl);
    toast({
      title: "Sitemap Submission",
      description: "Sitemap submission pages have been opened. Complete the submission process in the new tabs.",
    });
  };

  const seoChecklist = [
    {
      name: "Meta Tags",
      status: "completed",
      description: "Title tags, meta descriptions, and keywords are optimized for all pages"
    },
    {
      name: "Open Graph Tags",
      status: "completed", 
      description: "Social media sharing tags are configured for better link previews"
    },
    {
      name: "Schema Markup",
      status: "completed",
      description: "Structured data is implemented for episodes and website information"
    },
    {
      name: "Canonical URLs",
      status: "completed",
      description: "Canonical tags prevent duplicate content issues"
    },
    {
      name: "Image SEO",
      status: "completed",
      description: "Alt text and optimized image loading are implemented"
    },
    {
      name: "URL Structure",
      status: "completed",
      description: "SEO-friendly URLs with episode slugs are generated"
    },
    {
      name: "Robots.txt",
      status: "completed",
      description: "Search engine crawling instructions are properly configured"
    },
    {
      name: "XML Sitemap", 
      status: "pending",
      description: "Generate and submit sitemap to search engines"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Health Check
          </CardTitle>
          <CardDescription>
            Monitor and manage your podcast's search engine optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {seoChecklist.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  {item.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Sitemap Management
          </CardTitle>
          <CardDescription>
            Generate and submit your XML sitemap to search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleDownloadSitemap}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {loading ? 'Generating...' : 'Download Sitemap'}
            </Button>
            
            <Button 
              onClick={handleSubmitSitemap}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Submit to Search Engines
            </Button>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Sitemap URL:</p>
            <code className="text-sm bg-background px-2 py-1 rounded">
              {sitemapUrl}
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            SEO Resources
          </CardTitle>
          <CardDescription>
            Useful tools and resources for improving your podcast's SEO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Search Console Setup</h4>
              <p className="text-sm text-muted-foreground">
                Connect your website to Google Search Console to monitor performance and indexing.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://search.google.com/search-console" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Google Search Console
                </a>
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Analytics Integration</h4>
              <p className="text-sm text-muted-foreground">
                Track your podcast website's traffic and user behavior with Google Analytics.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://analytics.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Google Analytics
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOManager;