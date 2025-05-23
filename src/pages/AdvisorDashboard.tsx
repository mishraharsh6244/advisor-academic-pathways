import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckIcon, ClockIcon, MessageSquare, UserCircle, Users, XIcon } from "lucide-react";
import { UpcomingEventsCard } from "@/components/dashboard/UpcomingEventsCard";
import { advisorData, getUpcomingEvents, getRecentAnnouncements } from "@/data/mockData";

// Mock student advising data
const studentAdvisingData = [
  {
    id: "s12345",
    name: "Jamie Smith",
    major: "Computer Science",
    year: "Junior",
    gpa: 3.7,
    advisingStatus: "scheduled",
    lastMeeting: "Apr 15, 2024",
    nextMeeting: "May 25, 2024",
    alerts: ["Registration hold", "Graduation check needed"],
  },
  {
    id: "s23456",
    name: "Taylor Williams",
    major: "Computer Science",
    year: "Senior",
    gpa: 3.4,
    advisingStatus: "pending",
    lastMeeting: "Mar 10, 2024",
    nextMeeting: null,
    alerts: ["Course selection needed"],
  },
  {
    id: "s34567",
    name: "Morgan Lee",
    major: "Computer Science",
    year: "Sophomore",
    gpa: 3.2,
    advisingStatus: "completed",
    lastMeeting: "May 10, 2024",
    nextMeeting: null,
    alerts: [],
  },
  {
    id: "s45678",
    name: "Jordan Brown",
    major: "Computer Science",
    year: "Junior",
    gpa: 3.9,
    advisingStatus: "scheduled",
    lastMeeting: "Apr 5, 2024",
    nextMeeting: "May 30, 2024",
    alerts: [],
  },
  {
    id: "s56789",
    name: "Alex Johnson",
    major: "Computer Science",
    year: "Freshman",
    gpa: 2.8,
    advisingStatus: "pending",
    lastMeeting: null,
    nextMeeting: null,
    alerts: ["Low GPA warning", "Missing prerequisites"],
  },
];

const AdvisorDashboard = () => {
  const upcomingEvents = getUpcomingEvents();
  const announcements = getRecentAnnouncements();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hello, Dr. {advisorData.name.split(' ')[1]}</h1>
          <p className="text-muted-foreground">
            {advisorData.department} Department • {advisorData.students.length} Advisees
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Button>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Office Hours
          </Button>
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            View All Students
          </Button>
        </div>
      </div>

      {/* Advising Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Student Advising Status</CardTitle>
            <CardDescription>
              {studentAdvisingData.length} total students
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Tabs defaultValue="pending">
              <TabsList className="mb-4 flex overflow-x-auto pb-1">
                <TabsTrigger value="pending" className="whitespace-nowrap">
                  Pending
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                    {studentAdvisingData.filter(s => s.advisingStatus === "pending").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="whitespace-nowrap">
                  Scheduled
                  <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200" variant="outline">
                    {studentAdvisingData.filter(s => s.advisingStatus === "scheduled").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="whitespace-nowrap">
                  Completed
                  <Badge className="ml-2 bg-green-100 text-green-800 border-green-200" variant="outline">
                    {studentAdvisingData.filter(s => s.advisingStatus === "completed").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <div className="space-y-4">
                  {studentAdvisingData
                    .filter(student => student.advisingStatus === "pending")
                    .map(student => (
                      <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.major} • {student.year}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                          {student.alerts.length > 0 && (
                            <Badge variant="destructive" className="mr-2">
                              {student.alerts.length} {student.alerts.length === 1 ? "Alert" : "Alerts"}
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                            Schedule
                          </Button>
                          <Button size="sm">
                            <MessageSquare className="mr-2 h-3.5 w-3.5" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled">
                <div className="space-y-4">
                  {studentAdvisingData
                    .filter(student => student.advisingStatus === "scheduled")
                    .map(student => (
                      <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.major} • {student.year}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                          <div className="text-sm text-muted-foreground mr-2">
                            <CalendarIcon className="inline-block mr-1 h-3.5 w-3.5" />
                            {student.nextMeeting}
                          </div>
                          <Button size="sm">
                            <UserCircle className="mr-2 h-3.5 w-3.5" />
                            Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="space-y-4">
                  {studentAdvisingData
                    .filter(student => student.advisingStatus === "completed")
                    .map(student => (
                      <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.major} • {student.year}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 mr-2">
                            <CheckIcon className="mr-1 h-3 w-3" />
                            Completed {student.lastMeeting}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="mr-2 h-3.5 w-3.5" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1 h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>
              Your schedule for the next two weeks
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === "advising" ? "bg-advising-primary" :
                      event.type === "deadline" ? "bg-advising-danger" :
                      "bg-advising-secondary"
                    }`} />
                    <div className="w-px h-full bg-border flex-1 mx-auto my-1" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span className="mx-1">•</span>
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="text-xs text-muted-foreground">
                        Location: {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Full Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentAdvisingData.length}</div>
            <p className="text-xs text-muted-foreground">In your advising load</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentAdvisingData.filter(s => s.advisingStatus === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Need to be scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students With Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentAdvisingData.filter(s => s.alerts.length > 0).length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Advising Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((studentAdvisingData.filter(s => s.advisingStatus === "completed").length / studentAdvisingData.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">For current term</p>
          </CardContent>
        </Card>
      </div>

      {/* Office Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Office Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Office Hours</h3>
              <p className="text-sm text-muted-foreground">{advisorData.officeHours}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Office Location</h3>
              <p className="text-sm text-muted-foreground">{advisorData.office}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">{advisorData.email}</p>
              <p className="text-sm text-muted-foreground">{advisorData.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvisorDashboard;
