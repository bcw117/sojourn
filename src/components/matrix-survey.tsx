'use client'

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface Rating {
  satisfaction: string
  importance: string
}

interface Ratings {
  [key: string]: Rating
}

export default function MatrixSurvey() {
  const [ratings, setRatings] = useState<Ratings>({
    customerSupport: { satisfaction: '', importance: '' },
    salesPitch: { satisfaction: '', importance: '' },
    marketing: { satisfaction: '', importance: '' },
    navigation: { satisfaction: '', importance: '' },
    clientSuccess: { satisfaction: '', importance: '' },
    implementation: { satisfaction: '', importance: '' },
  })

  const handleRatingChange = (category: string, type: 'satisfaction' | 'importance', value: string) => {
    setRatings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }))
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Please rate each experience.</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 min-w-[200px]"></th>
                  <th className="text-center p-2 border-b" colSpan={4}>
                    Satisfaction
                  </th>
                  <th className="text-center p-2 border-b" colSpan={2}>
                    Importance
                  </th>
                </tr>
                <tr className="bg-muted/50">
                  <th className="text-left p-2"></th>
                  <th className="text-center p-2 min-w-[120px]">Extremely satisfied</th>
                  <th className="text-center p-2 min-w-[120px]">Somewhat satisfied</th>
                  <th className="text-center p-2 min-w-[120px]">Somewhat dissatisfied</th>
                  <th className="text-center p-2 min-w-[120px]">Extremely dissatisfied</th>
                  <th className="text-center p-2 min-w-[100px]">Important</th>
                  <th className="text-center p-2 min-w-[100px]">Not Important</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'customerSupport', label: 'Interaction with customer support.' },
                  { id: 'salesPitch', label: 'Sales pitch.' },
                  { id: 'marketing', label: 'Marketing for newest features.' },
                  { id: 'navigation', label: 'Navigation of the website.' },
                  { id: 'clientSuccess', label: 'Assignment to a Client Success representative.' },
                  { id: 'implementation', label: 'Implementation of first project.' },
                ].map((item, index) => (
                  <tr key={item.id} className={index % 2 === 1 ? 'bg-muted/50' : ''}>
                    <td className="p-2">{item.label}</td>
                    {['extremely-satisfied', 'somewhat-satisfied', 'somewhat-dissatisfied', 'extremely-dissatisfied'].map((satisfaction) => (
                      <td key={satisfaction} className="text-center p-2">
                        <RadioGroup
                          value={ratings[item.id].satisfaction}
                          onValueChange={(value) => handleRatingChange(item.id, 'satisfaction', value)}
                          className="flex justify-center"
                        >
                          <RadioGroupItem
                            value={satisfaction}
                            id={`${item.id}-satisfaction-${satisfaction}`}
                            className="h-4 w-4"
                          />
                        </RadioGroup>
                      </td>
                    ))}
                    {['important', 'not-important'].map((importance) => (
                      <td key={importance} className="text-center p-2">
                        <RadioGroup
                          value={ratings[item.id].importance}
                          onValueChange={(value) => handleRatingChange(item.id, 'importance', value)}
                          className="flex justify-center"
                        >
                          <RadioGroupItem
                            value={importance}
                            id={`${item.id}-importance-${importance}`}
                            className="h-4 w-4"
                          />
                        </RadioGroup>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            Submit Ratings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

