def calculate_match_score(
        driver,
        company
):

    score = 0

    # transport type
    if (
        driver.transport_type ==
        company.transport_type
    ):
        score += 30

    # country
    if (
        driver.preferred_country ==
        company.operating_country
    ):
        score += 30

    # salary
    if (
        company.offered_salary >=
        driver.desired_salary
    ):
        score += 20

    # ADR
    if driver.has_adr:
        score += 20

    return score