import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, take, tap } from "rxjs/operators";
import { Observable } from "rxjs";

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}

@Component({
  selector: 'football-competitions',
  templateUrl: './footballCompetitions.component.html',
  styleUrls: ['./footballCompetitions.component.scss']
})
export class FootballCompetitions implements OnInit {

  totalPages: number[] = [];

  competitionDetails: Competition[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadDetailsByPage(1);
  }

  loadDetailsByPage(pageNumber) {
    this.getCompetitionDetails(pageNumber)
      .pipe(take(1))
      .subscribe((resData) => {
        this.totalPages = Array(resData.total_pages)
          .fill(x => x)
          .map((x, i) => i);
        this.competitionDetails = resData.data;
      });
  }

  getCompetitionDetails(pageNumber: any): Observable<ApiResponse> {
    const URL =
      "https://jsonmock.hackerrank.com/api/football_competitions?page=" +
      pageNumber;
    return this.http.get<ApiResponse>(URL);
  }
}
