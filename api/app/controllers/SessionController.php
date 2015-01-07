<?php

class SessionController extends \BaseController {

	public function createSession(){
		$ip=Request::getClientIp();
		$sessionID=Session::getId();

		$session=UserSession::where('sessionID','=', $sessionID)->first();

		if(!$session){
			$session=new UserSession;
			$session->sessionID=$sessionID;
			$session->ip=$ip;
			$session->save();
		}

		return Response::json(array(
			"sessionID" => $session->sessionID,
			"muted" => $session->muted
		));
	}

	public function updateSession(){
		$ip=Request::getClientIp();
		$sessionID=Session::getId();
		$muted=Input::get("muted");

		$session=UserSession::where('sessionID','=', $sessionID)->first();

		if(!$session){
			$session=new UserSession;
			$session->sessionID=$sessionID;
			$session->ip=$ip;
		}

		$session->muted=$muted;
		$session->save();

		return Response::json(array(
			"sessionID" => $session->sessionID,
			"muted" => $session->muted
		));
	}


	/**
	 * Display a listing of the resource.
	 * GET /session
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 * GET /session/create
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /session
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 * GET /session/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /session/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /session/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /session/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}