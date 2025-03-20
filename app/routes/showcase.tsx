import React from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { T } from '../components/T';
import type { Route } from '../+types/root';
import AppLayout from '../components/layout/AppLayout';

/**
 * UI Components showcase route
 * Displays all the UI components for development and testing
 */
export function meta(args: Route.MetaArgs) {
  return [
    { title: 'UI Components Showcase - VocabMaster' },
    { name: 'description', content: 'Showcase of UI components for VocabMaster' },
  ];
}

export default function ComponentsShowcase() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">UI Components Showcase</h1>
        
      {/* Button Showcase */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Buttons</h2>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Button Variants</h3>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="text">Text Button</Button>
          </div>
          
          <h3 className="text-lg font-medium mb-4 text-gray-700">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
          
          <h3 className="text-lg font-medium mb-4 text-gray-700">Full Width Button</h3>
          <div className="mb-8">
            <Button variant="primary" fullWidth={true}>Full Width Button</Button>
          </div>
          
          <h3 className="text-lg font-medium mb-4 text-gray-700">Disabled State</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
            <Button variant="text" disabled>Disabled Text</Button>
          </div>
        </div>
      </section>
      
      {/* Badge Showcase */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Badges</h2>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Badge Variants</h3>
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          
          <h3 className="text-lg font-medium mb-4 text-gray-700">Outline Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="primary" outline={true}>Primary</Badge>
            <Badge variant="secondary" outline={true}>Secondary</Badge>
            <Badge variant="success" outline={true}>Success</Badge>
            <Badge variant="warning" outline={true}>Warning</Badge>
            <Badge variant="error" outline={true}>Error</Badge>
            <Badge variant="info" outline={true}>Info</Badge>
          </div>
        </div>
      </section>
      
      {/* Card Showcase */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>This is a simple card with header and content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Cards are containers for content and actions related to a single topic.
                They can contain text, links, images, and UI controls.
              </p>
            </CardContent>
          </Card>
          
          {/* Card with Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>This card includes a footer section.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                This example demonstrates a card with content and a footer section
                that can contain actions or additional information.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end gap-2">
                <Button variant="text" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* T Component Showcase */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Translation Component</h2>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">App Name: <T t="app.name" /></p>
            <p className="text-gray-700 mb-2">Tagline: <T t="app.tagline" /></p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Navigation:</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm"><T t="nav.home" /></Button>
              <Button variant="secondary" size="sm"><T t="nav.dashboard" /></Button>
              <Button variant="secondary" size="sm"><T t="nav.tests" /></Button>
              <Button variant="secondary" size="sm"><T t="nav.vocabulary" /></Button>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4 text-gray-700">Feature Descriptions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent>
                  <CardTitle><T t="home.features.customTests.title" /></CardTitle>
                  <p className="mt-2 text-gray-600"><T t="home.features.customTests.description" /></p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardTitle><T t="home.features.performance.title" /></CardTitle>
                  <p className="mt-2 text-gray-600"><T t="home.features.performance.description" /></p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      </div>
    </AppLayout>
  );
} 