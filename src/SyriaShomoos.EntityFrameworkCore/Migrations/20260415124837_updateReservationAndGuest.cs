using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SyriaShomoos.Migrations
{
    /// <inheritdoc />
    public partial class updateReservationAndGuest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ActualCheckInTime",
                table: "Reservations",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualCheckOutTime",
                table: "Reservations",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Floor",
                table: "Reservations",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Guests",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ParentName",
                table: "Guests",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "BranchSources",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualCheckInTime",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ActualCheckOutTime",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "Floor",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "ParentName",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "City",
                table: "BranchSources");
        }
    }
}
