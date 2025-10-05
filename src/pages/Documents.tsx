import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthGuard } from "@/components/AuthGuard";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Upload, FileText, Search, Shield, Trash2, Eye } from "lucide-react";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const documents = [
    { id: 1, name: "Tax Return 2023.pdf", type: "Tax Form", date: "Jan 15, 2024", status: "analyzed" },
    { id: 2, name: "Credit Card Statement.pdf", type: "Credit Statement", date: "Jan 10, 2024", status: "analyzed" },
    { id: 3, name: "Bank Statement Dec.pdf", type: "Bank Statement", date: "Jan 5, 2024", status: "pending" },
  ];

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Document Analysis</h1>
          <p className="text-muted-foreground">
            Upload your financial documents for AI-powered explanations in your language.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 border-2 border-dashed hover:border-primary/50 transition-colors">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Documents</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>
              <Button size="lg" className="mt-4">
                <Upload className="mr-2 h-5 w-5" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Your Documents Are Secure</h3>
                <p className="text-sm text-muted-foreground">
                  All documents are encrypted end-to-end and stored with bank-level security. We never share your financial information with third parties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Documents</h2>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search documents"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        doc.status === "analyzed"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {doc.status === "analyzed" ? "Analyzed" : "Pending"}
                    </span>
                  </div>
                  <CardTitle className="text-base mt-4 truncate">{doc.name}</CardTitle>
                  <CardDescription>
                    <span className="block text-sm">{doc.type}</span>
                    <span className="block text-xs mt-1">{doc.date}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocs.length === 0 && (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents found matching your search.</p>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
      </div>
    </AuthGuard>
  );
};

export default Documents;
